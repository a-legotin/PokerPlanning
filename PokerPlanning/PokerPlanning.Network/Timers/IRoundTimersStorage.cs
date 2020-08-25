using System;
using System.Collections.Generic;
using System.Timers;

namespace PokerPlanning.Network.Timers
{
    public interface IRoundTimersStorage
    {
        void StartNew(Guid roundGuid, IEnumerable<string> connections);
        void DisposeTimer(Guid round);
    }
}