import {Component, Input, OnInit} from '@angular/core';
import {Vote} from '../../../models/vote';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
})

export class VotesComponent implements OnInit {
  @Input() allVotes: Vote[];

  constructor() {
  }

  ngOnInit(): void {
  }

  getAverage(): number {
    return this.allVotes.reduce(function (avg, value, _, { length }) {
      return avg + value.card.value / length;
    }, 0);
  }

  isConsensus(): boolean {
    if (this.allVotes.length < 1) {
      return true;
    }
    return this.allVotes.every(value => value.card.value === this.allVotes[0].card.value);
  }
}
