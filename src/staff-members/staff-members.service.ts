import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffMember } from './entities/staff-member.entity';
import { CreateStaffMemberDto } from './dto/create-staff-member.dto';
import { UpdateStaffMemberDto } from './dto/update-staff-member.dto';

@Injectable()
export class StaffMembersService {
  constructor(
    @InjectRepository(StaffMember)
    private readonly staffMemberRepository: Repository<StaffMember>,
  ) {}

  async create(
    createStaffMemberDto: CreateStaffMemberDto,
  ): Promise<StaffMember> {
    const newStaffMember =
      this.staffMemberRepository.create(createStaffMemberDto);
    return await this.staffMemberRepository.save(newStaffMember);
  }

  async findAll(): Promise<StaffMember[]> {
    return await this.staffMemberRepository.find();
  }

  async findOne(staffId: number): Promise<StaffMember> {
    const staffMember = await this.staffMemberRepository.findOne({
      where: { staffID: staffId },
    });

    if (!staffMember) {
      throw new NotFoundException(`Staff member with ID ${staffId} not found`);
    }

    return staffMember;
  }

  async update(
    staffId: number,
    updateDto: UpdateStaffMemberDto,
  ): Promise<StaffMember> {
    const existingStaffMember = await this.findOne(staffId);
    this.staffMemberRepository.merge(existingStaffMember, updateDto);
    return await this.staffMemberRepository.save(existingStaffMember);
  }

  async remove(staffId: number): Promise<void> {
    const existingStaffMember = await this.findOne(staffId);
    await this.staffMemberRepository.remove(existingStaffMember);
  }
}
