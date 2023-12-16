import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../services/entities/service.entity';

@Injectable()
export class ServiceSeederService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async seedServices() {
    const salonServices = [
      {
        serviceName: 'Haircut',
        description:
          'Professional haircut service with styling and consultation. We cater to all hair types and styles.',
        price: 30.0,
      },
      {
        serviceName: 'Manicure',
        description:
          'Pamper your hands with our deluxe manicure service. Includes nail shaping, cuticle care, and polish.',
        price: 25.0,
      },
      {
        serviceName: 'Massage',
        description:
          'Relax and unwind with our rejuvenating massage therapy. Choose from a variety of massage techniques.',
        price: 50.0,
      },
      {
        serviceName: 'Facial',
        description:
          'Revitalize your skin with our signature facial treatment. Includes cleansing, exfoliation, and hydration.',
        price: 40.0,
      },
      {
        serviceName: 'Pedicure',
        description:
          'Indulge in a relaxing pedicure experience. Our skilled technicians will leave your feet looking and feeling great.',
        price: 35.0,
      },
      {
        serviceName: 'Waxing',
        description:
          'Say goodbye to unwanted hair with our professional waxing services. Smooth, silky skin is just a session away.',
        price: 20.0,
      },
      {
        serviceName: 'Spa Package',
        description:
          'Indulge in the ultimate spa experience with our spa packages. Relaxation and pampering guaranteed.',
        price: 75.0,
      },
      {
        serviceName: 'Eyelash Extensions',
        description:
          'Enhance your natural beauty with eyelash extensions. Achieve longer, fuller lashes for a stunning look.',
        price: 60.0,
      },
      {
        serviceName: 'Tanning',
        description:
          'Get that sun-kissed glow without the harmful UV rays. Our tanning services will leave you bronzed and beautiful.',
        price: 45.0,
      },
    ];

    for (const serviceData of salonServices) {
      const existingService = await this.serviceRepository.findOne({
        where: { serviceName: serviceData.serviceName },
      });

      if (!existingService) {
        const service = this.serviceRepository.create(serviceData);
        await this.serviceRepository.save(service);
      }
    }
  }
}
