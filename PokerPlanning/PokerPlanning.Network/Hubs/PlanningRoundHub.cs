using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using PokerPlanning.Core.Data;
using PokerPlanning.Core.Models;
using PokerPlanning.Network.Extensions;
using PokerPlanning.Network.Timers;

namespace PokerPlanning.Network.Hubs
{
    public class PlanningRoundHub : Hub
    {
        private readonly IPlanningRoundRepository _repository;
        private readonly IRoomRepository _roomRepository;
        private readonly IRoundTimersStorage _roundTimersStorage;

        public PlanningRoundHub(IPlanningRoundRepository repository,
            IRoundTimersStorage roundTimersStorage,
            IRoomRepository roomRepository)
        {
            _repository = repository;
            _roundTimersStorage = roundTimersStorage;
            _roomRepository = roomRepository;
        }

        public async Task NewRound(Guid roomId, Guid startedBy)
        {
            var round = new PlanningRound
            {
                Id = Guid.NewGuid(),
                RoomId = roomId,
                StartedById = startedBy,
                TimeTaken = TimeSpan.Zero
            };
            _repository.Insert(round);
            var room = _roomRepository.GetById(roomId);
            var connections = room.Users.Select(user => user.ConnectionId);
            _roundTimersStorage.StartNew(round.Id, connections);

            await Clients.All.SendAsync("onNewRoundStarted", round);
        }

        public async Task ShowAllVotes(Guid roundId)
        {
            var round = _repository.GetById(roundId);
            await Clients.All.SendAsync("onVotesShown", round.Votes);
        }

        public async Task Vote(PlanningRound round, PlanningUser user, PlanningCard card)
        {
            round = _repository.GetById(round.Id);
            var vote = new PlanningVote
            {
                Id = Guid.NewGuid(),
                RoundId = round.Id,
                Card = card,
                User = user
            };
            round.Votes.AddOrUpdate(vote);
            _repository.Update(round);
            var room = _roomRepository.GetById(round.RoomId);
            if (room == null)
                return;
            if (room.Users.Count == round.Votes.Count)
                await ShowAllVotes(round.Id);
            await Clients.All.SendAsync("onUserVoted", vote);
        }
    }
}