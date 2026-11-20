import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WalletLoginDto {
  @ApiProperty({
    description: 'Stellar public key',
    example: 'GABC123...',
  })
  @IsString({ message: 'publicKey must be a string' })
  @IsNotEmpty({ message: 'publicKey is required' })
  @Matches(/^G[A-Z0-9]{55}$/, { message: 'Invalid Stellar public key format' })
  publicKey: string;

  @ApiProperty({
    description: 'Base64-encoded signature of the nonce',
    example: 'abc123...',
  })
  @IsString({ message: 'signature must be a string' })
  @IsNotEmpty({ message: 'signature is required' })
  signature: string;

  @ApiProperty({
    description: 'Nonce received from /auth/nonce endpoint',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString({ message: 'nonce must be a string' })
  @IsNotEmpty({ message: 'nonce is required' })
  nonce: string;
}
