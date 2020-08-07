using System;
using System.Collections.Generic;
using PokerPlanning.Core.Data;

namespace PokerPlanning.Core.Models
{
    public class PlanningRoom : IEntity
    {
        public Guid Id { get; set; }
        public HashSet<PlanningUser> Users { get; set; }

        public PlanningRoom()
        {
            Users = new HashSet<PlanningUser>();
            Id = Guid.NewGuid();
        }
    }
}