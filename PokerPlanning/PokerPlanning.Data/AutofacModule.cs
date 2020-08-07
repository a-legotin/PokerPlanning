using Autofac;
using PokerPlanning.Core.Data;

namespace PokerPlanning.Data
{
    public class AutofacModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.Register(c => new InMemoryRoomRepository()).As<IRoomRepository>().SingleInstance();
        }
    }
}