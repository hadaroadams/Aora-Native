import { FormData } from "@/app/(tabs)/create";
import { DocumentPickerAsset } from "expo-document-picker";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  ImageGravity,
  Query,
  Storage,
} from "react-native-appwrite";
export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.hadaro.aora",
  projectId: "66d3096c00230974cf6f",
  databaseId: "66d30bf900194cb3de7b",
  usersCollectId: "66d30c34002b2e640e45",
  vidoeCollectionId: "66d30c4f000cc1e2c438",
  storageId: "66d30f4c000cc90b1717",
};
const {
  databaseId,
  endpoint,
  platform,
  projectId,
  storageId,
  usersCollectId,
  vidoeCollectionId,
} = config;
// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(endpoint) // Your Appwrite Endpoint
  .setProject(projectId) // Your project ID
  .setPlatform(platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;
    const avatarURL = avatars.getInitials(username);
    await signIn({ email, password });
    const newUser = await databases.createDocument(
      databaseId,
      usersCollectId,
      ID.unique(),
      { accountID: newAccount.$id, email, username, avatar: avatarURL }
    );
    return newUser;
  } catch (error) {
    throw error;
  }
};

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw error;
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    // console.log(currentAccount);
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      databaseId,
      usersCollectId,
      [Query.equal("accountID", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};
// Register User
export const getAllPosts = async () => {
  try {
    const post = await databases.listDocuments(databaseId, vidoeCollectionId);
    return post.documents;
  } catch (error) {
    throw error;
  }
};
export const getAllTrendingPost = async () => {
  try {
    const post = await databases.listDocuments(databaseId, vidoeCollectionId, [
      Query.orderDesc("$createdAt"),
      Query.limit(7),
    ]);
    // console.log(2,post);
    return post.documents;
  } catch (error) {
    throw error;
  }
};
export const getSearchPost = async (query: any) => {
  try {
    // console.log(3, query);
    const post = await databases.listDocuments(databaseId, vidoeCollectionId, [
      Query.search("title", query),
    ]);

    // console.log(2, post);
    return post.documents;
  } catch (error) {
    throw error;
  }
};
export const getUserPost = async (userId: any) => {
  try {
    // console.log(3, query);
    const post = await databases.listDocuments(databaseId, vidoeCollectionId, [
      Query.equal("users", userId),
    ]);

    // console.log(2, post);
    return post.documents;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

export const getFilePreview = async (fileId: string, type: string) => {
  let fileUrl;
  try {
    if (type === "video") {
      fileUrl = storage.getFileView(storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }
    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const uploadFile = async (file: DocumentPickerAsset, type: string) => {
  if (!file) return;
  console.log(1);
  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };
  try {
    const uploadFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset as any
    );
    console.log(2, file);
    const fileUrl = await getFilePreview(uploadFile.$id, type);
    return fileUrl;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createVideo = async ({
  prompt,
  thumbnail: image,
  title,
  video,
  users,
}: FormData) => {
  try {
    // const [thumbnail, videoUrl] = await Promise.all([
    //   uploadFile(video!, "video"),
    //   uploadFile(image!, "image"),
    // ]);
    const videoUrl = await uploadFile(video!, "video");
    const thumbnail = await uploadFile(image!, "image");

    console.log(thumbnail);
    console.log(videoUrl);
    const newPost = await databases.createDocument(
      databaseId,
      vidoeCollectionId,
      ID.unique(),
      {
        title,
        image,
        prompt,
        video,
        users,
      }
    );
    return newPost;
  } catch (error: any) {
    throw new Error(error);
  }
};
