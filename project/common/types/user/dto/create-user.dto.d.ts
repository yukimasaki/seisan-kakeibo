import { User } from '../entities/user.entity';
declare const CreateUserDto_base: import("@nestjs/common").Type<Omit<User, "id" | "membership">>;
export declare class CreateUserDto extends CreateUserDto_base {
}
export {};
