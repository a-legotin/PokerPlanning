using System;
using System.Collections.Concurrent;

namespace PokerPlanning.Core.Data
{
    public interface IRoomConnectionsStorage
    {
        ConcurrentDictionary<string, Guid> RoomConnections { get; }
    }
}