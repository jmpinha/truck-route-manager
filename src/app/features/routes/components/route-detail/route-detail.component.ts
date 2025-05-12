import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { Route } from '../route-list/route-list.component';

@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, FormsModule]
})
export class RouteDetailComponent implements OnInit {
  routeId: number = 0;
  route!: Route;
  
  // Status options for updating
  statusOptions = [
    'Pending',
    'In Progress',
    'Completed',
    'Delayed',
    'Cancelled'
  ];
  
  // Mock data for route details (would be fetched from service in real app)
  mockRoutes: Route[] = [
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

  constructor(
    private route_: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    const paramId = this.route_.snapshot.paramMap.get('id');
    if (paramId) {
      this.routeId = +paramId;
      this.loadRouteData();
    } else {
      this.router.navigate(['/routes']);
    }
  }

  // Load route data (simulated)
  loadRouteData() {
    // In a real application, this would be a service call
    const found = this.mockRoutes.find(r => r.id === this.routeId);
    
    if (found) {
      this.route = found;
    } else {
      this.presentToast('Route not found');
      this.router.navigate(['/routes']);
    }
  }

  // Update route status
  async updateStatus() {
    const alert = await this.alertController.create({
      header: 'Update Status',
      inputs: this.statusOptions.map(status => ({
        name: status.toLowerCase().replace(' ', '_'),
        type: 'radio',
        label: status,
        value: status,
        checked: this.route.status === status
      })),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Update',
          handler: (status) => {
            // Update status
            this.route.status = status;
            this.presentToast(`Status updated to ${status}`);
            
            // In a real app, this would make an API call
            // this.routeService.updateStatus(this.routeId, status).
          }
        }
      ]
    });

    await alert.present();
  }

  // Present toast message
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'primary'
    });
    toast.present();
  }

  // Navigate back to routes list
  goBack() {
    this.router.navigate(['/routes']);
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
