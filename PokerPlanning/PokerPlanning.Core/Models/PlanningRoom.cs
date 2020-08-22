using System;
using System.Collections.Generic;
using PokerPlanning.Core.Data;

namespace PokerPlanning.Core.Models
{
    public class PlanningRoom : IEntity
    {
        public Guid Id { get; set; }
        public HashSet<PlanningUser> Users { get; set; }
        public HashSet<PlanningCard> Cards { get; set; }

        public PlanningRoom()
        {
            Cards = new HashSet<PlanningCard>();
            Users = new HashSet<PlanningUser>();
            Id = Guid.NewGuid();
        }
    }
}