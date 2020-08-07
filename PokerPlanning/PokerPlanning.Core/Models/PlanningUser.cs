using System;
using PokerPlanning.Core.Data;

namespace PokerPlanning.Core.Models
{
    [Serializable]
    public struct PlanningUser : IEntity
    {
        public string ConnectionId { get; set; }
        public Guid Id { get; set; }
        public string Name { get; set; }
        
        public UserRole Role { get; set; }
    }

    public enum UserRole
    {
        Owner = 0,
        Member = 1,
        Observer = 2
    }
}