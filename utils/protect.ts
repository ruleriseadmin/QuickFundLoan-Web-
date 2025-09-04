import { jwtVerify, SignJWT } from 'jose';

const encryptToken = async (token: string) => {
    if (!process.env.NEXT_PUBLIC_JWT_SECRET) {
        throw new Error('JWT secret is missing');
    }

    // Convert the JWT secret to a Uint8Array
    const secretKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

    // Create a new SignJWT instance and sign the token
    const encryptedAccessToken = await new SignJWT({ token })
        .setProtectedHeader({ alg: 'HS256' }) // Set the algorithm
        .setIssuedAt() // Set the issued at time
        .setExpirationTime('1d') 
        .sign(secretKey); // Sign with the secret key

    // Store the encrypted token in local storage
    localStorage.setItem('token', encryptedAccessToken);
    return encryptedAccessToken;
};

const decryptToken = async (): Promise<string | null> => {
    const token = localStorage.getItem('token') || '';
    
    try {
        if (!process.env.NEXT_PUBLIC_JWT_SECRET) {
            throw new Error('JWT secret is missing');
        }

        const secretKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
        
        const { payload } = await jwtVerify(token, secretKey);
        return payload?.token as string;
    } catch (error: any) {
        console.error("An error occurred during token decryption", error.message);
        localStorage.removeItem('token');
        return null;
    }
};


const clearToken = (token: any) => {
    localStorage.removeItem('token');
    localStorage.removeItem('fcm_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('device_id');
    localStorage.removeItem('showWelcomeNoticeAgain');
    localStorage.removeItem('showNotificationPermission');
    
}



export { encryptToken, decryptToken , clearToken};
