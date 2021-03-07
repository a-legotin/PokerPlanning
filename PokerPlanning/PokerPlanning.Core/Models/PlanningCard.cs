using System;

namespace PokerPlanning.Core.Models
{
    [Serializable]
    public class PlanningCard
    {
        public Guid Id { get; set; }

        public string Display { get; set; }

        public string Value { get; set; }
    }
}