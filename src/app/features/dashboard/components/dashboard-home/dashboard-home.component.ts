import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  personCircleOutline, locationOutline, navigateOutline,
  timeOutline, alertCircleOutline, homeOutline, mapOutline,
  personOutline
} from 'ionicons/icons';


interface Route {
  id: number;
  origin: string;
  originAddress: string;
  destination: string;
  destinationAddress: string;
  eta: Date;
  distance: number;
  status: string;
}

interface Delivery {
  id: number;
  destination: string;
  date: Date;
  status: string;
}

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class DashboardHomeComponent implements OnInit {
  currentDate = new Date();

  // Mock data for demonstration
  currentRoute: Route = {
    id: 1,
    origin: 'Madrid Warehouse',
    originAddress: 'Calle Principal 123, Madrid, Spain',
    destination: 'Barcelona Distribution Center',
    destinationAddress: 'Av. del Puerto 456, Barcelona, Spain',
    eta: new Date(new Date().getTime() + 3 * 60 * 60 * 1000), // 3 hours from now
    distance: 612,
    status: 'In Progress'
  };

  recentDeliveries: Delivery[] = [
    {
      id: 101,
      destination: 'Valencia Depot',
      date: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // Yesterday
      status: 'Completed'
    },
    {
      id: 102,
      destination: 'Seville Logistics Center',
      date: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      status: 'Completed'
    },
    {
      id: 103,
      destination: 'Malaga Distribution',
      date: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      status: 'Delayed'
    }
  ];

  constructor() {
    addIcons({
      personCircleOutline, locationOutline, navigateOutline,
      timeOutline, alertCircleOutline, homeOutline, mapOutline,
      personOutline
    });
  }

  ngOnInit() { }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'primary';
      case 'Delayed':
        return 'warning';
      case 'Failed':
        return 'danger';
      default:
        return 'medium';
    }
  }

}
