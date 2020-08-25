using Autofac;
using Microsoft.AspNetCore.SignalR;
using PokerPlanning.Network.Hubs;
using PokerPlanning.Network.Timers;

namespace PokerPlanning.Core
{
    public class AutofacModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.Register(c => new RoundTimers(c.Resolve<IHubContext<PlanningRoundHub>>())).As<IRoundTimersStorage>().SingleInstance();
        }
    }
}