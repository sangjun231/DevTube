import supabase from './startApi';

export const userRegist = async (email, password) => {
  await supabase.auth.signUp({
    email,
    password
  });
  return { data, error };
}; // 회원가입

export const userLogin = async (email, password) => {
  await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
}; // 일반 로그인

export const userLoginOAuth = async (provider) => {
  await supabase.auth.signInWithOAuth({
    provider: provider
  });
  return { data, error };
}; // 서드 파티 로그인

export const userLogout = async () => {
  await supabase.auth.signOut();
  return { error };
}; // 로그아웃

export const getUser = async () => {
  await supabase.auth.getUser();
  return { data: { user } };
}; // 사용자 정보 GET
