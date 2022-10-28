import {
    DocumentType,
    getModelForClass,
    index,
    modelOptions,
    pre,
    prop,
} from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';

@index({ citizenID: 1 })
@pre<User>('save', async function () {
    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 12);
})
@modelOptions({
    schemaOptions: {
    timestamps: true,
    },
})
  

export class User {
    @prop({ required: true, unique: true, minlength: 13, maxLength: 13 })
    citizenID!: string;

    @prop({ required: true})
    laserCode!: string;

    @prop({ required: true, unique: true })
    email!: string;

    @prop({ required: true, minlength: 8, maxLength: 32, select: false })
    password!: string;

    async comparePasswords(hashedPassword: string, candidatePassword: string) {
      return await bcrypt.compare(candidatePassword, hashedPassword);
    }
}

const userModel = getModelForClass(User);
export default userModel;
  
  