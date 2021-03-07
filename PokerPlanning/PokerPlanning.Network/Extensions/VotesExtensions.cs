using System.Collections.Generic;
using PokerPlanning.Core.Models;

namespace PokerPlanning.Network.Extensions
{
    internal static class VotesExtensions
    {
        public static void AddOrUpdate(this List<PlanningVote> votes, PlanningVote vote)
        {
            var existingVote =
                votes.FindIndex(v => v.RoundId == vote.RoundId && v.User.Id == vote.User.Id);
            if (existingVote > -1)
            {
                votes.RemoveAt(existingVote);
            }

            votes.Add(vote);
        }
    }
}