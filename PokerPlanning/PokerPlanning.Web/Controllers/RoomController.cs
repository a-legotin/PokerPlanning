using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PokerPlanning.Core.Data;
using PokerPlanning.Core.Models;

namespace PokerPlanning.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
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
        public void AddRoom([FromBody] PlanningRoom book) => roomRepository.Insert(book);

        [HttpDelete]
        [Route("{roomId}")]
        public void DeleteRoom(Guid roomId) => roomRepository.Delete(roomId);
    }
}