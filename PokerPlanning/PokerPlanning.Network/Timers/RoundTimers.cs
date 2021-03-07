using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Timers;
using Microsoft.AspNetCore.SignalR;
using PokerPlanning.Network.Hubs;

namespace PokerPlanning.Network.Timers
{
    internal class RoundTimers : IRoundTimersStorage, IDisposable
    {
        private readonly IHubContext<PlanningRoundHub> _hub;
        private readonly Timer _timer;

        public RoundTimers(IHubContext<PlanningRoundHub> hub)
        {
            _hub = hub;
            _timer = new Timer {Interval = TimeSpan.FromSeconds(1).TotalMilliseconds};
            _timer.Elapsed += TimerOnElapsed;
            _timer.Start();
            Stopwatches = new ConcurrentDictionary<Guid, Stopwatch>();
        }

        private ConcurrentDictionary<Guid, Stopwatch> Stopwatches { get; }

        public void Dispose()
        {
            _timer?.Dispose();
        }


        public void StartNew(Guid roundGuid, IEnumerable<string> connections)
        {
            var stopwatch = Stopwatch.StartNew();
            Stopwatches[roundGuid] = stopwatch;
        }

        public void DisposeTimer(Guid round)
        {
            if (!Stopwatches.TryRemove(round, out var timer))
                return;
            timer.Stop();
        }

        private async void TimerOnElapsed(object sender, ElapsedEventArgs e)
            => await Task.Run(() =>
            {
                foreach (var value in Stopwatches.Values)
                {
                    _hub.Clients.All.SendAsync("onRoundTimerTick", value.Elapsed);
                }
            });
    }
}