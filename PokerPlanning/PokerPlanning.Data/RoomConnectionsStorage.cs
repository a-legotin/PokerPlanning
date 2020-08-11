using System;
using System.Collections.Concurrent;

namespace PokerPlanning.Data
{
    internal class RoomConnectionsStorage : IRoomConnectionsStorage
    {
        public RoomConnectionsStorage()
        {
            RoomConnections  = new ConcurrentDictionary<string, Guid>();
        }

        public ConcurrentDictionary<string, Guid> RoomConnections { get; }
    }
}