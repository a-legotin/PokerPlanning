using System;
using System.Collections.Generic;
using PokerPlanning.Core.Data;

namespace PokerPlanning.Core.Models
{
    [Serializable]
    public class PlanningRound : IEntity
    {
        public Guid Id { get; set; }
        
        public Guid RoomId { get; set; }
        
        public Guid StartedById { get; set; }
        
        public TimeSpan TimeTaken { get; set; }
        
        public List<PlanningVote> Votes { get; set; } = new List<PlanningVote>();
    }
}