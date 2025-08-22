const users = new Map<string, { name: string; email: string; senha: string }>();

let session: string | null = null;

const formulario = new Map<string, { titulo: string; descricao: string; id: number , email: string}>();


let idCounter = 1;








export function getFormulario()  {
  if (!session) {
    return [];
  }
  return Array.from(formulario.values()).filter(form => form.email === session);
}







export function addFormulario(titulo: string, descricao: string) {
    if (!titulo || !descricao) {
        console.error("Dados incompletos para criar formulário");
        return false;
    }
    if (!session) {
        console.error("Nenhuma sessão ativa");
        return false;
    }
    const id = idCounter++;
  
    formulario.set(id.toString(), { titulo, descricao, id, email: session });
   
    console.log("Formulário criado com sucesso", { titulo, descricao, id, email: session });
   
    return true;
  }

export function deleteFormulario(id: number) {
  if (!session) return false;
  
  const form = formulario.get(id.toString());
  if (form && form.email === session) {
   
    formulario.delete(id.toString());
    return true;
  }
  return false;
}

export function updateFormulario(id: number, titulo?: string, descricao?: string) {
  if (!session) return false;
  
  const form = formulario.get(id.toString());
  if (form && form.email === session) {


    const updatedForm = {
      ...form,
      ...(titulo !== undefined && { titulo }),
      ...(descricao !== undefined && { descricao })
    };
    

    formulario.set(id.toString(), updatedForm);
    console.log("Campo atualizado:", { id, titulo, descricao });
    return true;
  }
  return false;
}







export function getSession() {
    return session;
  }

export function setSession(email: string) {
    session = email;
}

export function clearSession() {
    session = null;
}




export function findUser(email: string, senha?: string) {
  try {
    if (!senha) {
      return users.has(email) ? users.get(email) : null;
    }
    const user = users.get(email);
    if (user && user.senha === senha) {
      return user;
    }
    return null;
    
  } catch (error) {
    console.error("Erro ao buscar usuario:", error);
    return null;
  }
}


export function addUser(name: string, email: string, senha: string) {
  try {
    if (!name || !email || !senha) {
      console.error("Dados incompletos para criar usuário");
      return false;
    }
    
    if (users.has(email)) {
      console.error("Usuario ja existe", email);
      return false;
    }
    
    users.set(email, { name, email, senha });
    console.log("Usuário criado com sucesso", { name, email });
    return true;
    
  } catch (error) {
    console.error("Erro ao criar usuario", error);
    return false;
  }
}
