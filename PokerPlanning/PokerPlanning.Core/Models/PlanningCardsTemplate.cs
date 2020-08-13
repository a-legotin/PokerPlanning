using System;
using PokerPlanning.Core.Data;

namespace PokerPlanning.Core.Models
{
    public class PlanningCardsTemplate : IEntity
    {
        public Guid Id { get; set; }
        
        public PlanningCardSet CardSet { get; set; }
    }
}