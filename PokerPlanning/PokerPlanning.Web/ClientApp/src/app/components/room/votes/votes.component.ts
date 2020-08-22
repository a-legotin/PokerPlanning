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
    return this.allVotes.filter(item => this.isNumber(item.card.value)).reduce(function (avg, value, _, { length }) {
      return avg + Number(value.card.value) / length;
    }, 0);
  }

  private isNumber(value: string | number): boolean {
    return ((value != null) &&
      (value !== '') &&
      !isNaN(Number(value.toString())));
  }

  isConsensus(): boolean {
    if (this.allVotes.length < 1) {
      return true;
    }
    return this.allVotes.every(value => value.card.value === this.allVotes[0].card.value);
  }
}
