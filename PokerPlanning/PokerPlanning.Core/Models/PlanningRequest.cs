using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace PokerPlanning.Core.Models
{
    [Serializable]
    public class PlanningRequest
    {
        [JsonProperty("cards")]
        public HashSet<PlanningCard> Cards { get; set; }

        [JsonProperty("ownerName")]
        public string OwnerName { get; set; }
    }
}