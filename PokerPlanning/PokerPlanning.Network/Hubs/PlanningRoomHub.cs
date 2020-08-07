using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using PokerPlanning.Core;
using PokerPlanning.Core.Data;
using PokerPlanning.Core.Models;

namespace PokerPlanning.Network.Hubs
{
    public class PlanningRoomHub : Hub
    {

        private readonly IRoomRepository _repository;

        public PlanningRoomHub(IRoomRepository repository)
        {
            _repository = repository;
        }

        public async Task CreatePlanningRoom(string userName)
        {
            var user = new PlanningUser
            {
                Id = Guid.NewGuid(),
                Name = userName,
                ConnectionId = Context.ConnectionId,
                Role = UserRole.Owner
            };
            
            var room = new PlanningRoom();
            room.Users.Add(user);

            _repository.Insert(room);
             await Clients.Caller.SendAsync("onRoomCreated", room);
        }

        public async Task Join(string userName, Guid roomId)
        {
            var connectionId = Context.ConnectionId;
            var user = new PlanningUser
            {
                Id = Guid.NewGuid(),
                Name = userName,
                ConnectionId = connectionId
            };

            var room = _repository.GetById(roomId);
            if (room != null)
            {
                await Clients.Caller.SendAsync("onConnected", user, room);
                await Clients.AllExcept(connectionId).SendAsync("onNewUserConnected", user);
            }
        }
    }
}