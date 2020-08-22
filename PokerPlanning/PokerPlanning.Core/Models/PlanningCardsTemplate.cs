using System;
using System.Collections.Generic;
using PokerPlanning.Core.Data;

namespace PokerPlanning.Core.Models
{
    public class PlanningCardsTemplate : IEntity
    {
        public Guid Id { get; set; }
        
        public string Name { get; set; }
        public HashSet<PlanningCard> Cards { get; set; }
    }
}