using System;
using Newtonsoft.Json;

namespace PokerPlanning.Core.Models
{
    [Serializable]
    public class PlanningRequest
    {
        [JsonProperty("cards")]
        public PlanningCardSet Cards { get; set; }
    }
}