using System;
using System.Collections.Generic;

namespace PokerPlanning.Network.Timers
{
    public interface IRoundTimersStorage
    {
        void StartNew(Guid roundGuid, IEnumerable<string> connections);
        void DisposeTimer(Guid round);
    }
}