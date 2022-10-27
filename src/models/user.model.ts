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
    if (!this.isModified('laserCode')) return;

    this.laserCode = await bcrypt.hash(this.laserCode, 12);
})
@modelOptions({
    schemaOptions: {
    timestamps: true,
    },
})
  

export class User {
    @prop({ required: true, unique: true, minlength: 13, maxLength: 13 })
    citizenID!: string;

    @prop({ required: true, minlength: 1, select: false })
    laserCode!: string;

    async comparePasswords(hashedPassword: string, candidatePassword: string) {
      return await bcrypt.compare(candidatePassword, hashedPassword);
    }
}

const userModel = getModelForClass(User);
export default userModel;
  
  