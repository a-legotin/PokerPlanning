using System;

namespace PokerPlanning.Core.Data
{
    public interface IEntity
    {
        Guid Id { get; set; }
    }
}