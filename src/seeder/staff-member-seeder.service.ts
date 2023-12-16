import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffMember } from '../staff-members/entities/staff-member.entity';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class StaffMemberSeederService {
  constructor(
    @InjectRepository(StaffMember)
    private readonly staffMemberRepository: Repository<StaffMember>,
  ) {}

  async seedStaffMembers() {
    const staffMembersSeed = [
      {
        firstName: 'Emily',
        lastName: 'Jones',
        dateOfBirth: new Date('1988-04-20'),
        gender: 'Female',
        email: 'emily.jones@example.com',
        phone: '555-987-6543',
        address: '789 Maple Street, Cityburg',
        specialization: 'Hair Stylist',
        bio: 'Passionate hairstylist with over 10 years of experience in creating stunning and trendy hairstyles. Committed to providing exceptional service and making clients look and feel their best. Continuously staying updated on the latest hair trends and techniques to deliver cutting-edge styles.',
      },
      {
        firstName: 'Michael',
        lastName: 'Davis',
        dateOfBirth: new Date('1995-08-12'),
        gender: 'Male',
        email: 'michael.davis@example.com',
        phone: '555-123-4567',
        address: '456 Oak Avenue, Townsville',
        specialization: 'Nail Technician',
        bio: "Experienced nail technician specializing in creative and detailed nail art. With a keen eye for design and precision, I transform nails into miniature works of art. Whether it's classic manicures or intricate nail designs, I strive to exceed client expectations and bring their nail fantasies to life.",
      },
      {
        firstName: 'Sophia',
        lastName: 'Roberts',
        dateOfBirth: new Date('1987-11-25'),
        gender: 'Female',
        email: 'sophia.roberts@example.com',
        phone: '555-789-0123',
        address: '123 Cedar Lane, Villagetown',
        specialization: 'Esthetician',
        bio: 'Dedicated esthetician with a passion for skincare and beauty. Offering a wide range of skincare treatments, from relaxing facials to advanced skincare solutions. With extensive knowledge of skincare products and techniques, I aim to enhance the natural beauty of each client and promote a healthy, radiant complexion.',
      },
      {
        firstName: 'Matthew',
        lastName: 'White',
        dateOfBirth: new Date('1990-02-08'),
        gender: 'Male',
        email: 'matthew.white@example.com',
        phone: '555-234-5678',
        address: '987 Pine Street, Hamletville',
        specialization: 'Massage Therapist',
        bio: 'Certified massage therapist specializing in various massage techniques to promote relaxation, relieve tension, and improve overall well-being. With a focus on personalized care, I tailor each massage session to meet the unique needs of my clients. Committed to creating a serene and rejuvenating experience for every individual.',
      },
      {
        firstName: 'Olivia',
        lastName: 'Martin',
        dateOfBirth: new Date('1993-06-15'),
        gender: 'Female',
        email: 'olivia.martin@example.com',
        phone: '555-345-6789',
        address: '654 Birch Street, Suburbia',
        specialization: 'Makeup Artist',
        bio: "Creative and skilled makeup artist with a flair for enhancing natural beauty and creating stunning makeup looks. Whether it's for special occasions, photo shoots, or bridal makeup, I strive to bring out the best features in every client. Using high-quality products and precision techniques to achieve flawless and long-lasting results.",
      },
      {
        firstName: 'Daniel',
        lastName: 'Taylor',
        dateOfBirth: new Date('1985-12-03'),
        gender: 'Male',
        email: 'daniel.taylor@example.com',
        phone: '555-876-5432',
        address: '321 Elm Street, Countryside',
        specialization: 'Spa Therapist',
        bio: 'Experienced spa therapist dedicated to providing holistic and rejuvenating spa experiences. Offering a range of spa treatments, including massages, body scrubs, and aromatherapy, to promote relaxation and overall wellness. Committed to creating a peaceful and calming environment for clients to escape the stresses of everyday life.',
      },
    ];

    for (const staffMemberData of staffMembersSeed) {
      try {
        const staffMember = this.staffMemberRepository.create(staffMemberData);
        await this.staffMemberRepository.save(staffMember);
      } catch (error) {
        // Handle the duplicate entry error or other errors
        if (
          error instanceof QueryFailedError &&
          error.message.includes('Duplicate entry')
        ) {
          console.log(`Duplicate entry error: ${error.message}`);
        } else {
          console.error(error);
        }
      }
    }
  }
}
