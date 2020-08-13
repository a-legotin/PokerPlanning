using System;
using System.Net.Security;

namespace PokerPlanning.Core.Models
{
    public class PlanningCard
    {
        public Guid Id { get; set; }
        
        public string Display { get; set; }

        public string Value { get; set; }
    }
}