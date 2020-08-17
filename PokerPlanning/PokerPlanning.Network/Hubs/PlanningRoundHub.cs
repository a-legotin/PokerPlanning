using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using PokerPlanning.Core.Data;
using PokerPlanning.Core.Models;
using PokerPlanning.Network.Extensions;

namespace PokerPlanning.Network.Hubs
{
    public class PlanningRoundHub : Hub
    {
        private readonly IPlanningRoundRepository _repository;

        public PlanningRoundHub(IPlanningRoundRepository repository)
        {
            _repository = repository;
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
            await Clients.All.SendAsync("onNewRoundStarted", round);
        }
        
        public async Task ShowAllVotes(Guid roundId)
        {
            var round = _repository.GetById(roundId);
            await Clients.All.SendAsync("onVotesShown", round.Votes);
        }

        public async Task Vote(Guid roundId, PlanningUser user, PlanningCard card)
        {
            var round = _repository.GetById(roundId);
            var vote = new PlanningVote
            {
                Id = Guid.NewGuid(),
                RoundId = round.Id,
                Card = card,
                User = user
            };
            round.Votes.AddOrUpdate(vote);
            _repository.Update(round);
            await Clients.All.SendAsync("onUserVoted", vote);
        }
    }
}