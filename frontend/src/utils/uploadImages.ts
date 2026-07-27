type UploadedImage = {
    smallImage: { Location: string };
    mediumImage: { Location: string };
  };
  
  export async function uploadImages(file): Promise<UploadedImage> {
    const payload = new FormData();
    payload.append('image', file);
  
    const response = await fetch(`${process.env.API_URL}/files/image`, {
      method: 'POST',
      credentials: 'include',
      body: payload,
    }).then((res) => res.json());
  
    return response;
  }
  
  export async function uploadPreeventImage(file) {
    const payload = new FormData();
    payload.append('image', file);
  
    const response = await fetch(`${process.env.API_URL}/files/pre-event-image`, {
      method: 'POST',
      credentials: 'include',
      body: payload,
    }).then((res) => res.json());
  
    return response;
  }
  
  export async function uploadTestCompanyLogo(file) {
    const payload = new FormData();
    payload.append('image', file);
  
    const response = await fetch(`${process.env.API_URL}/files/test-logo`, {
      method: 'POST',
      credentials: 'include',
      body: payload,
    }).then((res) => res.json());
  
    return response;
  }
  
  export async function uploadLivetCompanyLogo(file) {
    const payload = new FormData();
    payload.append('image', file);
  
    const response = await fetch(`${process.env.API_URL}/files/live-logo`, {
      method: 'POST',
      credentials: 'include',
      body: payload,
    }).then((res) => res.json());
  
    return response;
  }
  
  export async function getCandidateCV(candidateId) {
    const response = await fetch(
      `${process.env.API_URL}/files/candidate-cv/${candidateId}`,
      {
        method: 'GET',
        credentials: 'include',
      },
    )
      .then((res) => res.blob())
      .then((blob) => {
        var file = window?.URL.createObjectURL(blob);
        window?.open(file, '_blank');
      });
  
    return response;
  }
  