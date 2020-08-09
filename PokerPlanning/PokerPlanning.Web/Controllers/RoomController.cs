using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
        public IActionResult AddRoom([FromBody] PlanningRequest request)
        {
            var room = new PlanningRoom();
            room.Users.Add(new PlanningUser()
            {
                Id = Guid.NewGuid(),
                Name = request.OwnerName,
                Role =  UserRole.Owner
            });
            roomRepository.Insert(room);
            return Ok(room.Id);
        }

        [HttpDelete]
        [Route("{roomId}")]
        public void DeleteRoom(Guid roomId) => roomRepository.Delete(roomId);
    }
}