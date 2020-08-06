using System;
using System.Collections.Generic;

namespace PokerPlanning.Core
{
    public class PlanningRoom
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