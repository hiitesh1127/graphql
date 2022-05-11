import User from "../../models/user";
import Jwt from "../../utils/jwt";
import * as bcrypt from "bcryptjs";
import * as L from "lodash";
import { AuthenticationError, UserInputError, ValidationError } from "apollo-server";
import { userLoginSchema, userRegisterSchema } from "../../utils/joi";
export const resolvers = {
  Mutation: {
    register: async (_: any, args: any) => {
      try {
        const { username, email, password } = args.input;
        console.log(args.input);
        const { value, error } = await userRegisterSchema.validate(
          { username, email, password },
          { abortEarly: false }
        );
        if (error) {
          throw new UserInputError(error.details, { validationError:error.details })
        }
        const currentUser = await User.findOne({ email: value.email });
        if (currentUser) {
          throw new Error("EMAIL is already Present");
        }
        const currentUserWithUsername = await User.findOne({
          username: value.username,
        });
        if (currentUserWithUsername) {
          throw new Error("USERNAME is already Present");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          username,
          email,
          password: hashedPassword,
        });
        const saveUser = await user.save();
        const auth = new Jwt();
        const accessToken = await auth.signAccessToken(
          saveUser.id,
          saveUser.username
        );
        const response = {
          id: user.id,
          username: user.username,
          accessToken,
        };
        return response;
      } catch (err) {
        console.log(err);
        throw err
      }
    },
    login: async (_: any, args: { email: string; password: string }) => {
      try {
        const { email, password } = args;
        const { value, error } = await userLoginSchema.validate(
          { email, password },
          { abortEarly: false }
        );
        if (error) {
          throw new UserInputError("Validation Error", { validationError:error.details })
        }
        const user = await User.findOne({ email: value.email });
        if (!user) {
          throw new Error("Invalid email")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Incorrect Password")
        }
        const auth = new Jwt();
        const accessToken = await auth.signAccessToken(user.id, user.email);
        const response = {
          id: user.id,
          email: user.email,
          accessToken,
          username: user.username
        };
        return response;
      } catch (err) {
        console.log(err);
        throw err
      }
    },
  },
};