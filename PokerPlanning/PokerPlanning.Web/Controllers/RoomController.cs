using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PokerPlanning.Core.Data;
using PokerPlanning.Core.Models;

namespace PokerPlanning.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    [Produces("application/json")]
    public class RoomController : ControllerBase
    {
        private readonly IRoomRepository roomRepository;

        public RoomController(IRoomRepository roomRepository)
        {
            this.roomRepository = roomRepository;
        }

        [HttpGet]
        [Route("")]
        public IEnumerable<PlanningRoom> GetAllRooms() => roomRepository.GetAll();

        [HttpGet]
        [Route("{roomId}")]
        public PlanningRoom GetRoomById(Guid roomId) => roomRepository.GetById(roomId);

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> AddRoom([FromBody] PlanningRequest request)
        {
            return await Task.Run(() =>
            {
                var validCards = request.Cards
                    .Where(card => !string.IsNullOrEmpty(card.Display) && !string.IsNullOrEmpty(card.Value))
                    .ToArray();
                if (!validCards.Any())
                {
                    return (ActionResult)BadRequest();
                }
                var room = new PlanningRoom
                {
                    Cards = new HashSet<PlanningCard>(validCards),
                    Users = new HashSet<PlanningUser>(new[]
                    {
                        new PlanningUser()
                        {
                            Name = request.OwnerName,
                            Role = UserRole.Owner,
                            Id = Guid.NewGuid()
                        }
                    })
                };
                roomRepository.Insert(room);
                return Ok(room);
            });
        }

        [HttpDelete]
        [Route("{roomId}")]
        public void DeleteRoom(Guid roomId) => roomRepository.Delete(roomId);
    }
}