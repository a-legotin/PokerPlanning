using System;
using System.Collections.Concurrent;
using PokerPlanning.Core.Data;

namespace PokerPlanning.Data
{
    internal class RoomConnectionsStorage : IRoomConnectionsStorage
    {
        public RoomConnectionsStorage() => RoomConnections  = new ConcurrentDictionary<string, Guid>();

        public ConcurrentDictionary<string, Guid> RoomConnections { get; }
    }
}