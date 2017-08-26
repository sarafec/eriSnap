import { Component, HostListener, OnInit } from '@angular/core';
import { PhotoLoaderService } from './photoLoader.service';
import { Photos } from './photos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
	public photos:Photos[] = [];
	public selected: Photos;
	public index: number;

	constructor(private photoLoaderService: PhotoLoaderService) { }

	getData() {
		return this.photoLoaderService
			.getData()
			.map((photos) => {
				this.photos = photos;
			})
	}

	@HostListener('window:keyup', ['$event'])
	keyEvent(event: KeyboardEvent){
		if(event.keyCode === 39){
			this.onSelectNext(this.selected);
		}

		if(event.keyCode === 37){
			this.onSelectPrevious(this.selected);
		}
	}

	touch1 = {x: 0, y: 0, time: 0 };

	@HostListener('window:touchstart', ['$event'])
	@HostListener('window:touchend', ['$event'])
	@HostListener('window:touchCancel', ['$event'])
	handleTouch(evt){
	    var touch = evt.touches[0] || evt.changedTouches[0];
	    if (evt.type === 'touchstart'){
	      this.touch1.x = touch.pageX;
	      this.touch1.y = touch.pageY;
	      this.touch1.time = evt.timeStamp;
	    } else if (evt.type === 'touchend'){
	      var dx = touch.pageX - this.touch1.x;
	      var dy = touch.pageY - this.touch1.y;
	      var dt = evt.timeStamp - this.touch1.time;

	      if (dt < 500){
	        if (Math.abs(dx) > 60){
	          if (dx > 0){
					this.onSelectNext(this.selected);
	          } else {
					this.onSelectPrevious(this.selected);
	          }
	        }
	      }
	    } 
	  }



	onSelect(targetPhoto: Photos): void {
		this.selected = targetPhoto;
	}

	onSelectNext(targetPhoto: Photos): void {		
		this.photos.map((photo, index) => {
			if(photo.path === targetPhoto.path){
				this.index = index
			}
		})
		if(this.index === this.photos.length - 1) {
			this.selected = this.photos[0]
		} else {
			this.selected = this.photos[this.index + 1];
		}
	}

	onSelectPrevious(targetPhoto: Photos): void {		
		this.photos.map((photo, index) => {
			if(photo.path === targetPhoto.path){
				this.index = index
			}
		})

		if(this.index === 0) {
			this.selected = this.photos[this.photos.length -1]
		} else {
			this.selected = this.photos[this.index - 1];		
		}
	}

	ngOnInit() {
		this.getData().subscribe(_ => {;
			this.photos;

			this.selected = this.photos[0];
		})
	}
}
