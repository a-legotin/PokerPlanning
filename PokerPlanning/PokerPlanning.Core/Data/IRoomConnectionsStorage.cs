using System;
using System.Collections.Concurrent;

namespace PokerPlanning.Data
{
    public interface IRoomConnectionsStorage
    {
        ConcurrentDictionary<string, Guid> RoomConnections { get; }
    }
}