import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface DriverProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage: string;
  licenseNumber: string;
  licenseType: string;
  licenseExpiryDate: Date;
  vehicleId: string;
  vehicleModel: string;
  vehiclePlate: string;
  joinDate: Date;
  address: string;
  city: string;
  country: string;
  emergencyContact: string;
  emergencyPhone: string;
  stats: DriverStats;
  recentActivity: ActivityItem[];
}

export interface DriverStats {
  totalRoutes: number;
  completedRoutes: number;
  totalDistance: number;
  totalHours: number;
  rating: number;
  fuelEfficiency: number;
  onTimeDeliveryRate: number;
}

export interface ActivityItem {
  id: number;
  type: 'route' | 'message' | 'update' | 'maintenance';
  description: string;
  date: Date;
  details?: string;
}

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, FormsModule]
})
export class ProfileDetailsComponent implements OnInit {
  driver!: DriverProfile;
  isEditing = false;
  segment = 'details';

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loadDriverProfile();
  }

  loadDriverProfile() {
    // Mock data - in a real app, this would be fetched from a service
    this.driver = {
      id: 'D12345',
      firstName: 'Carlos',
      lastName: 'Rodriguez',
      email: 'carlos.rodriguez@example.com',
      phone: '+34 612 345 678',
      profileImage: 'assets/profile-placeholder.jpg',
      licenseNumber: 'LIC-28374659',
      licenseType: 'C+E (Heavy Vehicles & Trailers)',
      licenseExpiryDate: new Date('2027-06-15'),
      vehicleId: 'VEH-845721',
      vehicleModel: 'Volvo FH16',
      vehiclePlate: '7843 BCN',
      joinDate: new Date('2022-03-10'),
      address: 'Calle Serrano 142',
      city: 'Madrid',
      country: 'Spain',
      emergencyContact: 'Maria Rodriguez',
      emergencyPhone: '+34 612 987 654',
      stats: {
        totalRoutes: 328,
        completedRoutes: 325,
        totalDistance: 198540,
        totalHours: 4267,
        rating: 4.8,
        fuelEfficiency: 92,
        onTimeDeliveryRate: 97.8
      },
      recentActivity: [
        {
          id: 1,
          type: 'route',
          description: 'Completed route from Madrid to Barcelona',
          date: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000),
          details: 'Delivered on time, no incidents'
        },
        {
          id: 2,
          type: 'maintenance',
          description: 'Vehicle maintenance completed',
          date: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000),
          details: 'Regular servicing and tire replacement'
        },
        {
          id: 3,
          type: 'message',
          description: 'Received new dispatch notification',
          date: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
        },
        {
          id: 4,
          type: 'update',
          description: 'Updated personal information',
          date: new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000)
        }
      ]
    };
  }

  async editProfile() {
    if (this.isEditing) {
      // Save profile changes
      this.isEditing = false;
      this.presentToast('Profile updated successfully');
    } else {
      this.isEditing = true;
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }

  async updateContactInfo() {
    const alert = await this.alertController.create({
      header: 'Update Contact Information',
      inputs: [
        {
          name: 'phone',
          type: 'tel',
          placeholder: 'Phone Number',
          value: this.driver.phone
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email',
          value: this.driver.email
        },
        {
          name: 'address',
          type: 'text',
          placeholder: 'Address',
          value: this.driver.address
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Update',
          handler: (data) => {
            this.driver.phone = data.phone;
            this.driver.email = data.email;
            this.driver.address = data.address;
            this.presentToast('Contact information updated');
          }
        }
      ]
    });

    await alert.present();
  }

  async updateEmergencyContact() {
    const alert = await this.alertController.create({
      header: 'Update Emergency Contact',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Contact Name',
          value: this.driver.emergencyContact
        },
        {
          name: 'phone',
          type: 'tel',
          placeholder: 'Contact Phone',
          value: this.driver.emergencyPhone
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Update',
          handler: (data) => {
            this.driver.emergencyContact = data.name;
            this.driver.emergencyPhone = data.phone;
            this.presentToast('Emergency contact updated');
          }
        }
      ]
    });

    await alert.present();
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'route':
        return 'map-outline';
      case 'message':
        return 'chatbubble-outline';
      case 'update':
        return 'refresh-outline';
      case 'maintenance':
        return 'construct-outline';
      default:
        return 'ellipsis-horizontal-outline';
    }
  }

  getActivityColor(type: string): string {
    switch (type) {
      case 'route':
        return 'primary';
      case 'message':
        return 'secondary';
      case 'update':
        return 'tertiary';
      case 'maintenance':
        return 'warning';
      default:
        return 'medium';
    }
  }

  formatDate(date: Date): string {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  }
}
