import { supabase } from './supabase';

/* auth schema users table api */

export const userRegist = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });
  return { data, error };
}; // 회원가입

export const userLogin = async ({ email, password }) => {
  const response = await supabase.from('users').select('*').eq('email', email);
  if (!response?.data?.length) {
    return;
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
}; // 일반 로그인

export const userLogout = async () => {
  const { data, error } = await supabase.auth.signOut();
  localStorage.clear();
  return { data, error };
}; // 로그아웃

export const getAuthUser = async () => {
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return user;
}; // auth 사용자 정보 SELECT

export const getAuthSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { data, error };
}; // auth 사용자 세션 정보 SELECT

/* ------------------------------------------------------------------------ */

/* public schema users table api */

export const addUser = async ({ id, email, nickname }) => {
  const { data, error } = await supabase.from('users').insert([
    {
      id: id,
      email: email,
      nickname: nickname
    }
  ]);
  return { data, error };
}; // public의 users에 사용자 INSERT

export const selectEqUser = async (authId) => {
  const { data, error } = await supabase.from('users').select('*').eq('id', authId).single();
  return { data, error };
}; // 고유 ID가 일치하는 사용자 정보 SELECT

export const updateUserNickname = async (nickname, userId) => {
  const { data, error } = await supabase.from('users').update({ nickname: nickname }).eq('id', userId).select();
  return { data, error };
}; // 고유 ID가 일치하는 사용자 닉네임 UPDATE
