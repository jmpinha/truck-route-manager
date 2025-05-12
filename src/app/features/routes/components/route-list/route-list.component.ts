import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface Route {
  id: number;
  origin: string;
  originAddress: string;
  destination: string;
  destinationAddress: string;
  startTime: Date;
  eta: Date;
  distance: number;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Delayed' | 'Cancelled';
  cargo: string;
  priority: 'Low' | 'Medium' | 'High';
}

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, FormsModule]
})
export class RouteListComponent implements OnInit {
  // Mock data
  routes: Route[] = [
    {
      id: 1,
      origin: 'Madrid Warehouse',
      originAddress: 'Calle Principal 123, Madrid, Spain',
      destination: 'Barcelona Distribution Center',
      destinationAddress: 'Av. del Puerto 456, Barcelona, Spain',
      startTime: new Date(new Date().getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
      eta: new Date(new Date().getTime() + 3 * 60 * 60 * 1000), // 3 hours from now
      distance: 612,
      status: 'In Progress',
      cargo: 'Electronics and Household Goods',
      priority: 'High'
    },
    {
      id: 2,
      origin: 'Barcelona Distribution Center',
      originAddress: 'Av. del Puerto 456, Barcelona, Spain',
      destination: 'Valencia Logistics Hub',
      destinationAddress: 'Calle del Mar 789, Valencia, Spain',
      startTime: new Date(new Date().getTime() + 5 * 60 * 60 * 1000), // 5 hours from now
      eta: new Date(new Date().getTime() + 9 * 60 * 60 * 1000), // 9 hours from now
      distance: 350,
      status: 'Pending',
      cargo: 'Produce and Refrigerated Goods',
      priority: 'Medium'
    },
    {
      id: 3,
      origin: 'Valencia Logistics Hub',
      originAddress: 'Calle del Mar 789, Valencia, Spain',
      destination: 'Alicante Depot',
      destinationAddress: 'Avenida Central 321, Alicante, Spain',
      startTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Tomorrow
      eta: new Date(new Date().getTime() + 26 * 60 * 60 * 1000), // Tomorrow + 2 hours
      distance: 170,
      status: 'Pending',
      cargo: 'Construction Materials',
      priority: 'Low'
    }
  ];

  // Filter options
  statusFilter: string = 'all';

  constructor(private router: Router) { }

  ngOnInit() {}

  // Method to navigate to route details
  viewRouteDetails(routeId: number) {
    this.router.navigate(['/routes', routeId]);
  }

  // Filtered routes based on status filter
  get filteredRoutes(): Route[] {
    if (this.statusFilter === 'all') {
      return this.routes;
    }
    return this.routes.filter(route => route.status.toLowerCase() === this.statusFilter.toLowerCase());
  }

  // Get color based on status
  getStatusColor(status: string): string {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'primary';
      case 'Pending':
        return 'warning';
      case 'Delayed':
        return 'danger';
      case 'Cancelled':
        return 'medium';
      default:
        return 'medium';
    }
  }

  // Get color based on priority
  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'High':
        return 'danger';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'medium';
    }
  }
}
