using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PokerPlanning.Core.Data;
using PokerPlanning.Core.Models;

namespace PokerPlanning.Web.Controllers
{
    [ApiController]
    [Route("api/card/template")]
    [AllowAnonymous]
    [Produces("application/json")]
    public class CardsTemplatesController : ControllerBase
    {
        private readonly ICardsTemplateRepository repository;

        public CardsTemplatesController(ICardsTemplateRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        [Route("")]
        public IEnumerable<PlanningCardsTemplate> GetAll() => repository.GetAll();

        [HttpGet]
        [Route("{roomId}")]
        public PlanningCardsTemplate GetById(Guid roomId) => repository.GetById(roomId);

        [HttpPost]
        [Route("")]
        public IActionResult Add([FromBody] PlanningCardsTemplate request)
        {
            var room = new PlanningCardsTemplate();
            repository.Insert(room);
            return Ok(room.Id);
        }

        [HttpDelete]
        [Route("{roomId}")]
        public void Delete(Guid roomId) => repository.Delete(roomId);
    }
}