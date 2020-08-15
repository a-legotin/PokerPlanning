using System;
using System.Collections.Generic;

namespace PokerPlanning.Core.Models
{
    [Serializable]
    public class PlanningCardSet
    {
        public HashSet<PlanningCard> Cards { get; set; }
    }
}