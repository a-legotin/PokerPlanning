using System;

namespace PokerPlanning.Core.Models
{
    [Serializable]
    public class PlanningVote
    {
        public Guid Id { get; set; }

        public PlanningUser User { get; set; }

        public Guid RoundId { get; set; }

        public PlanningCard Card { get; set; }
    }
}