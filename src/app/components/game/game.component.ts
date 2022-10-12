import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

export enum KEY_CODE {
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @Input('colums') colums: number = 0;
  @Input('rows') rows: number = 0;
  list: string[] = [];
  index: number = 0;
  prev: number = 0;
  max = 4;
  horizontal: number = 0;
  top: number = 0;
  right: number = 0;
  bottom: number = 0;
  left: number = 0;
  cols: number = 0;
  random: number[] = [];
  treasures: number[] = [];
  places: number[] = [0];
  shines: number[] = [];
  brisa: number[] = [];
  @Output('gameOver') gameOver: EventEmitter<any> = new EventEmitter();

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch (event.keyCode) {
      case KEY_CODE.RIGHT_ARROW:
        if (this.right < this.colums - 1) {
          this.index++;
          this.right++;
        }
        if (this.left > 0) this.left--;
        break;
      case KEY_CODE.LEFT_ARROW:
        if (this.left < this.colums - 1) {
          this.index--;
          this.left++;
        }
        if (this.right > 0) this.right--;
        break;
      case KEY_CODE.DOWN_ARROW:
        if (this.bottom < this.rows - 1) {
          this.index = this.index + this.colums;
          this.bottom++;
        }
        if (this.top > 0) this.top--;

        break;
      case KEY_CODE.UP_ARROW:
        if (this.top < this.rows - 1) {
          this.index = this.index - this.colums;
          this.top++;
        }
        if (this.bottom > 0) this.bottom--;

        break;
    }
    if (!this.places.includes(this.index)) this.places.push(this.index);
    const flag = this.random.find((index) => this.index === index);
    if (flag) {
      setTimeout(() => {
        alert('Caiste en un pozo, pierdes');
        this.gameOver.emit();
      }, 500);
    }
    const gold = this.treasures.find((index) => this.index === index);
    if (gold) {
      setTimeout(() => {
        alert('Encontraste oro, Ganaste!');
        this.gameOver.emit();
      }, 500);
    }
  }
  constructor() {}

  ngOnInit(): void {
    this.left = this.colums - 1;
    this.top = this.rows - 1;
    this.list = this.fillList(this.colums * this.rows);
    this.cols = Math.ceil(this.list.length / 4);
    this.max = 4;
    for (const rand of ['', '', '']) {
      const result = this.randomTramp(1, this.list.length);
      this.random.push(result);
      this.brisa.push(result - 1);
      this.brisa.push(result + 1);
    }
    for (const rand of ['', '']) {
      const result = this.randomTramp(1, this.list.length);
      if (!this.random.includes(result)) {
        this.treasures.push(result);
        this.shines.push(result - 1);
        this.shines.push(result + 1);
      }
    }
  }

  randomTramp(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }

  fillList(n: number): any[] {
    const result = [...Array(n).keys()].map(() => '');
    return result;
  }
}
