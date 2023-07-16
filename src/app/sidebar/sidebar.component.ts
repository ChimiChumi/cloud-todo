import { Component } from '@angular/core';
import { faBars, faPlus, faSignOut } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  barsIcon = faBars;
  plusIcon = faPlus;
  signOutIcon = faSignOut;
  showIcons = false;

  toggleIcons() {
    this.showIcons = !this.showIcons;
  }

  log(icon: string) {
    console.log(icon + " clicked!");
  }
}
